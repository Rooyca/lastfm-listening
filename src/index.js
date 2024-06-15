export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const match = url.pathname.match(/^\/v1\/last\/([^\/]+)$/);

    if (match) {
      const uname = match[1];
      const fetchUrl = env.URL_START + uname + env.URL_END;

      async function gatherResponse(response) {
        const { headers } = response;
        return await response.text()
      }

      const response = await fetch(fetchUrl);
      const result = await gatherResponse(response);
      const options = { headers: { "content-type": "application/json" } };
      let res = {
        label: "Last Played",
        message: "Error - 404",
        schemaVersion: 1,
      }
      
      // parse response to get artist and track name
      try {
        const recentTracks = JSON.parse(result);
        const track = recentTracks.recenttracks.track[0];
        const trackName = track.name;
        const artistName = track.artist['#text'];
        res['message'] = [artistName, trackName].join(" - ");
      } catch (e) {
        console.log("[!] Error: not a valid LASTFM response");
      }

      return new Response(JSON.stringify(res), options);
    }

    return new Response(
      `<title>rooyca</title>
        <div style="display: flex;
                 justify-content: center;
                 align-items: center;
                 height: 100%;
                 width: 100%;">
          <p style="color: black;
                    font-family: monospace;
                    font-size: 1.7vh">
              r o &empty; y c &forall;
          </p>
        </div>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
};
