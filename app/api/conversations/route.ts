import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.example.com"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Build query parameters
    const params = new URLSearchParams()

    const page = searchParams.get("page")
    const pageSize = searchParams.get("page_size")
    const startCreatedAt = searchParams.get("start_created_at")
    const endCreatedAt = searchParams.get("end_created_at")
    const startUpdatedAt = searchParams.get("start_updated_at")
    const endUpdatedAt = searchParams.get("end_updated_at")

    if (page) params.append("page", page)
    if (pageSize) params.append("page_size", pageSize)
    if (startCreatedAt) params.append("start_created_at", startCreatedAt)
    if (endCreatedAt) params.append("end_created_at", endCreatedAt)
    if (startUpdatedAt) params.append("start_updated_at", startUpdatedAt)
    if (endUpdatedAt) params.append("end_updated_at", endUpdatedAt)

    const response = await fetch(`${BACKEND_URL}/chat/conversations?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching conversations:", error)
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}
