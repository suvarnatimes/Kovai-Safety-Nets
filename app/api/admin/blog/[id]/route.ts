import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import BlogPost from "@/lib/models/BlogPost";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import slugify from "slugify";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const post = await BlogPost.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, slug, content, coverImageUrl, coverImagePublicId, status } = body;

    await connectToDatabase();

    const post = await BlogPost.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const oldSlug = post.slug;

    // If a new cover image is uploaded and old cover image existed, delete old image from Cloudinary
    if (coverImagePublicId && post.coverImagePublicId && post.coverImagePublicId !== coverImagePublicId) {
      await deleteFromCloudinary(post.coverImagePublicId);
    }

    let finalSlug = slug ? slugify(slug, { lower: true, strict: true }) : post.slug;

    // Check slug uniqueness if changed
    if (finalSlug !== post.slug) {
      const existing = await BlogPost.findOne({ slug: finalSlug, _id: { $ne: id } });
      if (existing) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }
    }

    post.title = title ?? post.title;
    post.slug = finalSlug;
    post.content = content ?? post.content;
    if (coverImageUrl !== undefined) post.coverImageUrl = coverImageUrl;
    if (coverImagePublicId !== undefined) post.coverImagePublicId = coverImagePublicId;
    if (status) post.status = status;

    await post.save();

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${oldSlug}`);
      if (finalSlug !== oldSlug) {
        revalidatePath(`/blog/${finalSlug}`);
      }
      revalidatePath("/");
    } catch (revErr) {
      console.warn("Revalidate error:", revErr);
    }

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const post = await BlogPost.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const postSlug = post.slug;

    // Delete cover image from Cloudinary using stored publicId if present
    if (post.coverImagePublicId) {
      await deleteFromCloudinary(post.coverImagePublicId);
    }

    await BlogPost.findByIdAndDelete(id);

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${postSlug}`);
      revalidatePath("/");
    } catch (revErr) {
      console.warn("Revalidate error:", revErr);
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
