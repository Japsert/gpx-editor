export async function GET(request: Request) {
  const response = await fetch("http://backend:8000/api/hello", {
    method: "GET",
    headers: request.headers,
  });
  const data = await response.text();
  return new Response(data);
}

export async function POST(request: Request) {
  const response = await fetch("http://backend:8000/api/hello", {
    method: "POST",
    headers: request.headers,
    body: request.body,
  });
  const data = await response.text();
  return new Response(data);
}

export async function DELETE(request: Request) {
  const response = await fetch("http://backend:8000/api/hello", {
    method: "DELETE",
    headers: request.headers,
  });
  const data = await response.text();
  return new Response(data);
}
