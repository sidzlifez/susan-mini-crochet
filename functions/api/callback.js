function renderBody(status, content) {
  const payload = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`);
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Authorizing...</title>
</head>
<body>
  <script>
    const receiveMessage = (message) => {
      window.opener.postMessage(${payload}, message.origin);
      window.removeEventListener("message", receiveMessage, false);
    };
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
    status: 200,
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  const client_id = env.GITHUB_CLIENT_ID;
  const client_secret = env.GITHUB_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return new Response("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET in Cloudflare Pages.", {
      status: 500,
    });
  }

  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return renderBody("error", { message: "Missing OAuth code from GitHub." });
    }

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "cloudflare-pages-decap-cms-oauth",
        "accept": "application/json",
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    });

    const result = await response.json();

    if (result.error) {
      return renderBody("error", result);
    }

    return renderBody("success", {
      token: result.access_token,
      provider: "github",
    });
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
