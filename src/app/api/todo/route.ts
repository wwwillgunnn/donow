import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// * create a todo * \\
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.todo) {
      return NextResponse.json(
        { error: "Missing todo title" },
        { status: 400 }
      );
    }

    const todo = await prisma.todo.create({
      data: {
        title: body.todo,
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

// * delete a todo * \\
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "Missing todo id" }, { status: 400 });
    }

    const todo = await prisma.todo.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

// * get all todos * \\
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed fetching todos" },
      { status: 500 }
    );
  }
}

// * Edit a todo * \\
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title } = body;

    if (!body) {
      return NextResponse.json({ error: "Missing todo info" }, { status: 400 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title },
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (e: any) {
    console.error("Error updating todo:", e);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

// * Complete a todo * \\
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Missing todo title" },
        { status: 400 }
      );
    }

    const todo = await prisma.todo.update({
      where: {
        id: body.id,
      },
      data: {
        completed: body.completed,
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
