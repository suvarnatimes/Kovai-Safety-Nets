import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import BlogPost from "@/lib/models/BlogPost";
import slugify from "slugify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, slug, content, coverImageUrl, coverImagePublicId, status } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    let finalSlug = slug ? slugify(slug, { lower: true, strict: true }) : slugify(title, { lower: true, strict: true });

    // Check slug uniqueness
    const existingPost = await BlogPost.findOne({ slug: finalSlug });
    if (existingPost) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const post = await BlogPost.create({
      title,
      slug: finalSlug,
      content,
      coverImageUrl: coverImageUrl || "",
      coverImagePublicId: coverImagePublicId || "",
      status: status || "draft",
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
