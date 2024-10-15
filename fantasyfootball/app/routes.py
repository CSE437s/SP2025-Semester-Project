from flask import Blueprint, jsonify, request, redirect, url_for
import os
from yfpy.query import YahooFantasySportsQuery
from pathlib import Path
from flask import render_template
import json
import pandas as pd
import psycopg2
from psycopg2 import pool
from app.db import get_connection, release_connection
import numpy as np

# Define a Blueprint for the API routes
api = Blueprint("api", __name__)
main = Blueprint("main", __name__)


@api.route("/auth", methods=["GET"])
def auth():
    redirect_uri = os.getenv("REDIRECT_URI")
    client_id = os.getenv("YAHOO_CLIENT_ID")
    client_secret = os.getenv("YAHOO_CLIENT_SECRET")
    response_type = "code"
    return redirect(
        f"https://api.login.yahoo.com/oauth2/request_auth?client_id={client_id}&client_secret={client_secret}&redirect_uri={redirect_uri}&response_type={response_type}"
    )


@api.route("/callback", methods=["GET"])
def callback():
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "Missing authorization code"}), 400

    query = YahooFantasySportsQuery(
        league_id="<YAHOO_LEAGUE_ID>",
        game_code="nfl",
        game_id=449,
        yahoo_consumer_key=os.getenv("YAHOO_CLIENT_ID"),
        yahoo_consumer_secret=os.getenv("YAHOO_CLIENT_SECRET"),
        env_file_location=Path(""),
    )

    query.save_access_token_data_to_env_file(
        env_file_location=Path(""), save_json_to_var_only=True
    )

    return redirect(url_for("main.home"))


@main.route("/home", methods=["GET","POST"])
def home():
    query = YahooFantasySportsQuery(
        league_id="<YAHOO_LEAGUE_ID>",
        game_code="nfl",
        game_id=449,
        yahoo_consumer_key=os.getenv("YAHOO_CLIENT_ID"),
        yahoo_consumer_secret=os.getenv("YAHOO_CLIENT_SECRET"),
        env_file_location=Path(""),
    )
    curr_user = query.get_current_user()._extracted_data["guid"]
    leagues = query.get_user_leagues_by_game_key(449)
    
    for league in leagues:
        if isinstance(league.name, bytes):
            league.name = league.name.decode('utf-8')
    if request.method == "POST":
        selected_league_id = request.form.get("league_id")
        query = YahooFantasySportsQuery(
            league_id=selected_league_id,
            game_code="nfl",
            game_id=449,
            yahoo_consumer_key=os.getenv("YAHOO_CLIENT_ID"),
            yahoo_consumer_secret=os.getenv("YAHOO_CLIENT_SECRET"),
            env_file_location=Path(""),
        )
        for team in query.get_league_teams():
            if team.is_owned_by_current_login == 1:
                curr_user_team = [team.team_id]

        team_info  = query.get_team_info(curr_user_team[0])._extracted_data
        # from team info i want team name and team roster
        team_name = team_info["name"]
        team_roster = team_info["roster"]

        return jsonify(team_roster)
        # return render_template("home.html", leagues=leagues, user_team=user_team, league_teams=league_teams)
    return render_template("home.html", leagues=leagues)



    # Access the roster
   
    # return team_info

@main.route('/waiver-wire')
def waiver_wire():
    try:
        # Get connection from the pool
        connection = get_connection()
        cursor = connection.cursor()

        # Query players for waiver wire (e.g., WR and RB positions)
        cursor.execute('SELECT "Player", "Pos", "Rankbypos" FROM "seasonstats" WHERE "Pos" IN (\'WR\', \'RB\')')
        rows = cursor.fetchall()

        waiver_wire_players = [
            {'name': row[0], 'position': row[1], 'projection': f'{row[2]} points'} for row in rows
        ]

        # Close cursor and release connection
        cursor.close()
        release_connection(connection)

        # Render the waiver_wire template with player data
        return render_template('waiver_wire.html', waiver_wire_players=waiver_wire_players)

    except Exception as error:
        print("Error fetching waiver wire data:", error)
        return "Error loading waiver wire", 500

def analyze_player(player):
    if player['Pos'] in ['QB', 'TE']:
        if player['Rankbypos'] == 1:
            return 'A+: best at Position!'
        elif 2 <= player['Rankbypos'] <= 5:
            return 'A:'
        elif 6 <= player['Rankbypos'] <= 10:
            return 'B'
        elif 11 <= player['Rankbypos'] <= 15:
            return 'C'
        elif 16 <= player['Rankbypos'] <= 20:
            return 'D'
        else:
            return 'F'
    elif player['Pos'] in ['WR', 'RB']:
        if player['Rankbypos'] == 1:
            return 'A+'
        elif 2 <= player['Rankbypos'] <= 5:
            return 'A'
        elif 6 <= player['Rankbypos'] <= 10:
            return 'B'
        elif 11 <= player['Rankbypos'] <= 15:
            return 'C'
        elif 16 <= player['Rankbypos'] <= 20:
            return 'D'
        else:
            return 'F'
    return 'N/A'

def calculate_consistency(player):
    weekly_points = [
        player['WK1Pts'],
        player['WK2Pts'],
        player['WK3Pts'],
        player['WK4Pts'],
        player['WK5Pts'],
        player['WK6Pts'],
    ]

    total_points = sum(weekly_points)
    
    # If total points are less than 40, return None for both total and std_dev
    if total_points < 40:
        return None, None

    # Calculate standard deviation for consistency
    mean = total_points / len(weekly_points)
    variance = np.var(weekly_points)
    std_dev = np.sqrt(variance)

    return total_points, std_dev

@main.route('/team-analyzer')
def team_analyzer():
    # Fetch all player data from the database
    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT "Player", "Pos", "Rankbypos", "WK1Pts", "WK2Pts", "WK3Pts", "WK4Pts", "WK5Pts", "WK6Pts" FROM "seasonstats"')
        all_players = cursor.fetchall()

        cursor.close()
        release_connection(connection)

        # Process the fetched data
        players = []
        for player in all_players:
            player_data = {
                'Player': player[0],          # Player name
                'Pos': player[1],             # Player Position
                'Rankbypos': player[2],       # Player Position rank
                'WK1Pts': player[3],
                'WK2Pts': player[4],
                'WK3Pts': player[5],
                'WK4Pts': player[6],
                'WK5Pts': player[7],
                'WK6Pts': player[8],
            }

            # Analyze player
            player_data['grade'] = analyze_player(player_data)
            total_points, std_dev = calculate_consistency(player_data)

            # Check for None values
            if total_points is None or std_dev is None:
                player_data['total_points'] = "N/A"
                player_data['std_dev'] = "N/A"
            else:
                player_data['total_points'] = total_points
                player_data['std_dev'] = std_dev

            players.append(player_data)

        # Render the template with player data
        return render_template('team_analyzer.html', players=players)

    except Exception as e:
        # Log the error or print for debugging
        print(f"Error fetching team analyzer data: {e}")
        return render_template('error.html', error_message=str(e))


@main.route('/trade-builder', methods=['GET', 'POST'])
def trade_builder():
    # Step 1: Fetch all player data from the database
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute('SELECT "Player", "Pos", "Rankbypos" FROM "seasonstats"')
    all_players = cursor.fetchall()

    cursor.close()
    release_connection(connection)

    # Step 2: Format the data into dictionaries for easy rendering in the template
    players = [{'name': player[0], 'position': player[1], 'rank': player[2]} for player in all_players]

    trade_feedback = None

    # Step 3: Handle form submission
    if request.method == 'POST':
        # Get the selected players from the form
        your_player = request.form.get('your_player')
        target_player = request.form.get('target_player')

        # Provide feedback on the trade proposal
        trade_feedback = f'You proposed trading {your_player} for {target_player}.'

    # Step 4: Render the template with player data and feedback
    return render_template('trade_builder.html', players=players, trade_feedback=trade_feedback)

