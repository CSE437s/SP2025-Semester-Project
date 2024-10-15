from flask import Blueprint, jsonify, request, redirect, url_for
import os
from yfpy.query import YahooFantasySportsQuery
from pathlib import Path
from flask import render_template

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


# get user info and get the league info from the user
@main.route("/home", methods=["GET"])
def home():
    query = YahooFantasySportsQuery(
        league_id="<YAHOO_LEAGUE_ID>",
        game_code="nfl",
        game_id=449,
        yahoo_consumer_key=os.getenv("YAHOO_CLIENT_ID"),
        yahoo_consumer_secret=os.getenv("YAHOO_CLIENT_SECRET"),
        env_file_location=Path(""),
    )

    leagues = query.get_user_leagues_by_game_key(449)
    league_teamsss = [
        {"league_id": league.league_id, "name": league.name.decode('utf-8')} for league in leagues
    ]
    
    new_query = YahooFantasySportsQuery(
        league_id=leagues[0].league_id,
        game_code="nfl",
        game_id=449,
        yahoo_access_token_json=os.getenv("YAHOO_ACCESS_TOKEN_JSON"),
        env_file_location=Path(""),
    )
    league_info = new_query.get_league_info()
    
    
    # team1_players = team1.players
    # team1_roster = team1.roster
    # team1_player1 = team1_players[0]
    # team1_player1_name = team1_player1.name
    import json
    from typing import Any

    def convert_to_serializable(obj: Any) -> Any:
        if isinstance(obj, list):
            return [convert_to_serializable(item) for item in obj]
        elif isinstance(obj, dict):
            return {key: convert_to_serializable(value) for key, value in obj.items()}
        elif hasattr(obj, "_extracted_data"):
            return convert_to_serializable(obj._extracted_data)
        elif hasattr(obj, "__dict__"):
            return {key: convert_to_serializable(value) for key, value in obj.__dict__.items()}
        else:
            return obj
    # Assuming league_info is a list of mixed types
    serializable_league_info = [convert_to_serializable(item) for item in league_info]

    team1 = new_query.get_team_info(1)

    
    return convert_to_serializable(team1)