import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

function getUsers() {
  const usersPath = path.join(process.cwd(), "data", "users.json");
  if (!fs.existsSync(usersPath)) return [];
  return JSON.parse(fs.readFileSync(usersPath, "utf-8"));
}

function saveUsers(users: object[]) {
  const usersPath = path.join(process.cwd(), "data", "users.json");
  fs.mkdirSync(path.dirname(usersPath), { recursive: true });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
  }

  const users = getUsers();

  if (users.find((u: { email: string }) => u.email === email)) {
    return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
  }

  users.push({
    id: Date.now().toString(),
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  saveUsers(users);
  return NextResponse.json({ message: "Usuario registrado exitosamente" }, { status: 201 });
}
