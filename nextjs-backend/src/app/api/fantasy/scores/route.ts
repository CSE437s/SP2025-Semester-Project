import { NextResponse } from "next/server";
import pool from "@/app/api/database/mysql"; // Database connection
import { RowDataPacket } from "mysql2";

// 🎯 API to get Fantasy Scores & Last Game Stats
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const playerId = url.searchParams.get("playerId");
    const userId = url.searchParams.get("userId");

    let query = `
      SELECT fs.player_id, p.firstname, p.lastname, fs.game_date, 
             fs.weekly_score, fs.cumulative_score,
             fs.turnovers, fs.personal_fouls, fs.field_goals_attempted,
             fs.field_goals_made, fs.free_throws_attempted, fs.free_throws_made, 
             fs.three_pointers_attempted, fs.three_pointers_made,
             fs.blocks, fs.steals, fs.plus_minus
      FROM fantasy_scores fs
      JOIN players p ON fs.player_id = p.id`;

    const queryParams: any[] = [];

    if (playerId) {
      query += ` WHERE fs.player_id = ? ORDER BY fs.game_date DESC LIMIT 1`;
      queryParams.push(playerId);
    } else if (userId) {
      query += `
        JOIN fantasy_teams ft ON fs.player_id = ft.player_id
        WHERE ft.user_id = ?
        ORDER BY fs.game_date DESC`;
      queryParams.push(userId);
    } else {
      query += " ORDER BY fs.game_date DESC";
    }

    const connection = await pool.getConnection();
    const [results] = await connection.execute<RowDataPacket[]>(query, queryParams);
    connection.release();

    return NextResponse.json({ scores: results });
  } catch (error) {
    console.error("❌ Error fetching fantasy scores:", error);
    return NextResponse.json({ error: "Failed to retrieve scores" }, { status: 500 });
  }
}
