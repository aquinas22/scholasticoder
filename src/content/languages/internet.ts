import { Language } from '../types'

export const internet: Language = {
  slug: 'internet',
  name: 'How the Internet Works',
  tagline: 'From typing a URL to pixels on screen.',
  description: "You type a URL and a page appears half a second later — after your request crossed continents, touched a dozen machines, and got reassembled from packets that each found their own route. Every web developer stands on this machinery. This track walks the whole journey: DNS, TCP/IP, HTTP, TLS, and what browsers actually do.",
  accentColor: '#2196F3',
  textOnAccent: '#fff',
  icon: 'IN',
  difficulty: 'beginner',
  usedFor: ['Web Development', 'APIs', 'Debugging', 'DevOps', 'Interviews'],
  notableUsers: ['Every website', 'Every app', 'Every API', 'You, right now', 'Everything'],
  setup: {
    description: "Concepts track — nothing to install. These built-in tools let you watch each layer work; every lesson uses one or two.",
    windows: `# All built in (PowerShell):
nslookup example.com        # DNS lookups
ping example.com            # reachability + latency
tracert example.com         # the route your packets take
curl.exe -v https://example.com   # raw HTTP conversation`,
    mac: `# All built in:
dig example.com             # DNS lookups (detailed)
ping -c 4 example.com       # reachability + latency
traceroute example.com      # the route packets take
curl -v https://example.com # raw HTTP conversation`,
    linux: `dig example.com             # DNS (install dnsutils if missing)
ping -c 4 example.com
traceroute example.com      # (or: mtr example.com — live view)
curl -v https://example.com`,
  },
  lessons: [
    {
      slug: 'the-big-picture',
      title: 'The Big Picture: Packets & Layers',
      intro: "The internet's founding trick: chop every message into small packets, let each one find its own way, reassemble at the far end. No phone-style dedicated lines — just billions of self-addressed envelopes.",
      sections: [
        {
          type: 'text',
          content: "There is no wire between you and a website. Your request is split into packets (~1,500 bytes each), each stamped with source and destination addresses. Routers — machines whose whole job is 'read the address, forward toward it' — pass each packet hop by hop. Packets may take different routes, arrive out of order, or vanish; the endpoints sort it out. This design survives failures beautifully: any router can die and packets route around it.",
        },
        {
          type: 'code',
          language: 'text',
          content: `The layers (each one only talks to its neighbors):

  Application   HTTP, DNS, SSH — what the data MEANS
  Transport     TCP/UDP — reliable delivery, ports
  Internet      IP — addressing & routing between networks
  Link          Ethernet, WiFi — the next physical hop

A packet is envelopes inside envelopes:
  [Ethernet [IP [TCP [HTTP "GET / ..."]]]]

Each hop unwraps the outer envelope, reads the IP
address, and re-wraps for the next physical link.`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Watch your packets cross the world:
traceroute example.com
#  1  192.168.1.1      1ms   your router
#  2  10.20.0.1        8ms   your ISP
#  5  core2.chi.net   25ms   a city backbone
#  9  93.184.216.34   85ms   the destination

# Each line = one router hop. Latency jumps reveal
# oceans: ~70ms extra = an Atlantic crossing.
# (Physics floor: light in fiber does ~200km per ms.)`,
        },
        {
          type: 'note',
          content: "Layering is why the internet evolves without coordination: WiFi replaced cables without changing IP; HTTP/3 replaced TCP with QUIC without changing web apps. Each layer only promises an interface to the one above — implementation swaps freely. It's the best API-design lesson in engineering history.",
        },
      ],
    },
    {
      slug: 'ip-addresses-routing',
      title: 'IP Addresses & Routing',
      intro: "Every machine on the internet has an address. How your laptop — with its private address behind a home router — talks to a server across the planet is a story of hierarchy and one great hack called NAT.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `# IPv4: four bytes, dotted — 4.3 billion possible:
# 93.184.216.34

# IPv6: sixteen bytes — effectively unlimited:
# 2606:2800:220:1:248:1893:25c8:1946

# Your two addresses:
curl ifconfig.me            # public IP (the world sees this)
ip addr | grep "inet "      # local IP (192.168.x.x — private)
                            # (ipconfig on Windows, ifconfig on Mac)

# Private ranges never appear on the public internet:
# 10.x.x.x | 172.16-31.x.x | 192.168.x.x
# 127.0.0.1 = localhost — always 'this machine'`,
        },
        {
          type: 'text',
          content: "IPv4 ran out of addresses, and NAT (Network Address Translation) is the patch that kept it alive: your router owns one public IP and rewrites traffic so every device in your home shares it — tracking which internal device each conversation belongs to. It's why your laptop can call out to any server, but servers can't call in to your laptop uninvited (and why game consoles complain about 'strict NAT').",
        },
        {
          type: 'text',
          content: "Routing between networks is hierarchical. The internet is ~80,000 autonomous systems — ISPs, clouds, universities — announcing to each other which address blocks they can reach, via a protocol called BGP. Routers don't know every machine; they know which neighbor is closer to each address block. Your packet climbs from home ISP to backbone, crosses, and descends into the destination's network.",
        },
        {
          type: 'note',
          content: "When BGP goes wrong, chunks of the internet vanish: Facebook's 2021 six-hour global outage was Facebook accidentally withdrawing its own BGP routes — the servers were fine, but no router on Earth knew a path to them. DNS and BGP failures are behind most 'half the internet is down' days.",
        },
      ],
    },
    {
      slug: 'dns',
      title: 'DNS — The Internet\'s Phone Book',
      intro: "Computers route by number; humans remember names. DNS translates example.com into 93.184.216.34 — a distributed database queried billions of times per second, and the first step of every page load.",
      sections: [
        {
          type: 'code',
          language: 'text',
          content: `The lookup chain for api.shop.example.com:

 1. Browser cache — seen this name recently?
 2. OS cache — anyone on this machine seen it?
 3. Resolver (your ISP's, or 1.1.1.1 / 8.8.8.8) — cached?
 4. Root servers:      "for .com, ask these servers"
 5. .com TLD servers:  "for example.com, ask these"
 6. example.com's nameservers: "api.shop = 93.184.216.34"

Answer flows back, cached at every step (per its TTL).
Cold lookup: ~50-200ms. Cached: ~0ms. This is why DNS
caching exists and why 'propagation' takes time.`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `dig example.com             # full lookup, all details
dig example.com +short      # just the answer
# 93.184.216.34

# Record types — DNS stores more than addresses:
dig example.com A           # name -> IPv4
dig example.com AAAA        # name -> IPv6
dig example.com MX          # who receives this domain's email
dig example.com TXT         # freeform (domain verification, SPF)
dig www.example.com CNAME   # alias -> another name
dig example.com NS          # which servers answer for this domain

# Watch the full chain yourself:
dig example.com +trace`,
        },
        {
          type: 'text',
          content: "The TTL (time-to-live) on each record says how long caches may keep it. Long TTLs (hours) mean fast lookups but slow changes; that's why DNS changes 'propagate' gradually — caches worldwide expire on their own schedules. Ops teams drop TTL to 60 seconds before a migration, move, then raise it again.",
        },
        {
          type: 'tip',
          content: "DNS is also a load balancer and a failover switch: return different IPs per query (round-robin), or per requester location (CDNs steering you to a nearby server). When a site is 'down for some people but not others', stale or split DNS is suspect number one. The dev-facing rule: it's always DNS.",
        },
      ],
    },
    {
      slug: 'tcp-udp',
      title: 'TCP & UDP — Reliable vs Fast',
      intro: "IP delivers packets 'best effort' — they can vanish, duplicate, or arrive shuffled. TCP builds reliability on top of that chaos. UDP skips the ceremony for speed. Every connection chooses one.",
      sections: [
        {
          type: 'code',
          language: 'text',
          content: `TCP opens with a handshake (one round trip):

  you  --- SYN ------->  server    "want to talk, seq=X"
  you  <-- SYN-ACK ----  server    "sure, seq=Y, got X"
  you  --- ACK ------->  server    "got Y — we're on"

Then every byte is numbered:
  - receiver ACKs what arrived
  - sender retransmits anything unACKed (loss!)
  - sequence numbers let receiver reorder & dedupe
  - flow control: receiver says how much it can take
  - congestion control: sender probes how fast the
    NETWORK can take it, backs off when loss appears

Result: a reliable byte stream over an unreliable network.`,
        },
        {
          type: 'text',
          content: "Ports let one machine hold many conversations: a connection is the 4-tuple (source IP, source port, destination IP, destination port). Servers listen on well-known ports — 443 HTTPS, 80 HTTP, 22 SSH, 53 DNS — while your side uses a random high port per connection. A 'connection refused' means the machine answered but nothing was listening on that port.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# See your machine's TCP conversations right now:
netstat -an | head -20      # (or: ss -t on Linux)
# ESTABLISHED = active   LISTEN = server waiting

# UDP: no handshake, no ACKs, no retransmit, no order.
# Just 'fling the packet'. Perfect when late data is
# worthless — a lost frame of a video call shouldn't
# be replayed 2 seconds later.
#   DNS queries    UDP (tiny, just re-ask on loss)
#   video calls    UDP (skip the glitch, keep going)
#   games          UDP (old positions are useless)
#   web, email     TCP (every byte must arrive)`,
        },
        {
          type: 'note',
          content: "HTTP/3 runs on QUIC — reliability rebuilt on top of UDP, with encryption baked in and the handshake merged into TLS's. Why abandon TCP? Head-of-line blocking: one lost TCP packet stalls every request sharing the connection. QUIC keeps streams independent, so one loss delays only its own stream. About a third of web traffic already rides it.",
        },
      ],
    },
    {
      slug: 'http-https',
      title: 'HTTP & HTTPS',
      intro: "Above all the plumbing sits a plain-text conversation: 'GET /page' — '200 OK, here you go'. HTTP is simple enough to speak by hand, and TLS wraps the whole exchange in encryption.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `curl -v https://example.com/ 2>&1 | grep -E '^[<>]'
# > GET / HTTP/2            <- the request line
# > host: example.com       <- headers: metadata
# > user-agent: curl/8.4
# >
# < HTTP/2 200              <- status
# < content-type: text/html
# < cache-control: max-age=3600
# <
# (then the HTML body)

# Methods — the verb of the request:
#   GET     read (no body, cacheable)
#   POST    create / submit
#   PUT     replace          PATCH   modify
#   DELETE  remove

# Status codes:
#   2xx yes | 3xx go elsewhere | 4xx your fault | 5xx my fault
#   200 OK, 301 moved, 304 not modified, 401 unauthenticated,
#   403 forbidden, 404 not found, 429 slow down, 500 crashed`,
        },
        {
          type: 'text',
          content: "HTTP is stateless: each request stands alone, and the server remembers nothing between them. Cookies bolt memory on — the server says Set-Cookie once, the browser attaches it to every later request, and that's how logins persist. Headers carry everything else: content types, cache rules, compression, auth tokens.",
        },
        {
          type: 'code',
          language: 'text',
          content: `HTTPS = HTTP inside a TLS tunnel. The handshake:

 1. Client: "I speak these ciphers, here's a random value"
 2. Server: "chosen cipher + my CERTIFICATE"
 3. Client checks the certificate:
      - signed by a trusted Certificate Authority?
      - actually for THIS domain? not expired?
 4. Key exchange -> both sides derive a shared secret
    (never transmitted — math does it: ECDHE)
 5. Everything after is encrypted with that secret

The padlock means: nobody between you and the server
can read or alter the traffic, and the server proved
its identity. It does NOT mean the site is honest.`,
        },
        {
          type: 'tip',
          content: "Certificates are free (Let's Encrypt) and automated now — there is no excuse for plain HTTP. For developers: 'mixed content' errors mean an HTTPS page loading an http:// asset, and CORS errors aren't network failures — they're the browser enforcing cross-origin rules the server must opt out of via headers.",
        },
      ],
    },
    {
      slug: 'browser-page-load',
      title: 'The Full Journey: URL to Pixels',
      intro: "Everything assembled: type example.com, press Enter, and watch every layer from this track fire in sequence — then the browser's own pipeline turns bytes into a rendered page.",
      sections: [
        {
          type: 'code',
          language: 'text',
          content: `enter 'example.com'
  1. DNS: name -> IP            (~0-100ms, likely cached)
  2. TCP handshake to :443      (1 round trip)
  3. TLS handshake              (1 round trip, certs checked)
  4. HTTP: GET /                (request + response)
  5. HTML arrives, parsing begins IMMEDIATELY
  6. Parser finds <link>, <script>, <img>
       -> more requests (each may repeat 1-4
          on new domains — CDNs, fonts, analytics)
  7. Render pipeline (below)
  8. Pixels.  Typical total: 0.5-3 seconds.

Rules that follow: fewer round trips = faster,
closer servers = faster (CDNs), cache = skip steps.`,
        },
        {
          type: 'text',
          content: "The browser's rendering pipeline: parse HTML into the DOM tree; parse CSS into rules and combine into the render tree; layout computes every element's position and size; paint fills in pixels; composite layers the result on the GPU. JavaScript can interrupt everywhere — a <script> without defer blocks parsing while it downloads and runs, which is why script placement matters.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Watch a real page load, timed per phase:
curl -o /dev/null -s -w '
DNS:        %{time_namelookup}s
TCP:        %{time_connect}s
TLS:        %{time_appconnect}s
First byte: %{time_starttransfer}s
Total:      %{time_total}s
' https://example.com

# In the browser: DevTools (F12) -> Network tab
# shows every request, its timing waterfall, cache
# hits, and headers. The single most useful web
# debugging tool ever built.`,
        },
        {
          type: 'note',
          content: "Caching is the web's real performance engine, at every level: browser cache (cache-control headers skip the request entirely), CDN edge caches (your request never crosses the ocean), DNS caches, connection reuse (keep-alive skips handshakes). A 'fast site' is mostly a site that arranged to skip steps.",
        },
      ],
    },
  ],
}
