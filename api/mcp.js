import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const VERSION = "1.0.0";

const LINKS = {
  website_fa: "https://promiseid.github.io/navid-ai-website/",
  website_en: "https://promiseid.github.io/navid-ai-website/en/",
  demo_video: "https://www.aparat.com/v/xklqa6y"
};

const PRODUCT = {
  fa: {
    name: "Navid AI",
    title: "ایجنت هوش مصنوعی نوید",
    platform: "Android",
    description:
      "Navid AI یک دستیار هوش مصنوعی فارسی برای گفتگوی متنی، تعامل صوتی و قابلیت‌های ایجنت در اندروید است.",
    modes: ["متن", "صوت", "ایجنت"],
    safety:
      "قابلیت‌های کنترلی گوشی در خود اپلیکیشن Android و با مجوزهای لازم و درخواست مستقیم کاربر اجرا می‌شوند. این پلاگین به‌تنهایی گوشی کاربر را کنترل نمی‌کند."
  },
  en: {
    name: "Navid AI",
    title: "Persian AI Agent",
    platform: "Android",
    description:
      "Navid AI is a Persian AI assistant for text chat, voice interaction, and agent-powered Android workflows.",
    modes: ["Text", "Voice", "Agent"],
    safety:
      "Device-control capabilities run inside the Android app with the required permissions and direct user intent. This plugin does not control a user's phone by itself."
  }
};

const COMMANDS = {
  apps: {
    fa: {
      title: "برنامه‌ها و جابه‌جایی",
      examples: [
        "تلگرام را باز کن",
        "واتساپ را باز کن",
        "اینستاگرام را باز کن",
        "یوتیوب را باز کن",
        "دوربین را باز کن",
        "گالری را باز کن",
        "فایل‌ها را باز کن",
        "ماشین حساب را باز کن"
      ]
    },
    en: {
      title: "Apps and navigation",
      examples: [
        "Open Telegram",
        "Open WhatsApp",
        "Open Instagram",
        "Open YouTube",
        "Open the camera",
        "Open the gallery",
        "Open files",
        "Open the calculator"
      ]
    }
  },
  utility: {
    fa: {
      title: "ابزارهای روزمره",
      examples: [
        "برای ساعت ۸ زنگ بگذار",
        "تایمر ۱۵ دقیقه‌ای بگذار",
        "چراغ قوه را روشن کن",
        "چراغ قوه را خاموش کن",
        "صدا را روی ۵۰ درصد بگذار",
        "روشنایی را روی ۴۰ درصد بگذار",
        "مسیر یک مقصد را روی نقشه باز کن"
      ]
    },
    en: {
      title: "Everyday utilities",
      examples: [
        "Set an alarm for 8:00",
        "Set a 15-minute timer",
        "Turn on the flashlight",
        "Turn off the flashlight",
        "Set volume to 50 percent",
        "Set brightness to 40 percent",
        "Open a destination on the map"
      ]
    }
  },
  communication: {
    fa: {
      title: "ارتباطات",
      examples: [
        "شماره‌گیر را برای یک شماره مشخص باز کن",
        "پیامک را برای یک مخاطب آماده کن",
        "ایمیل را برای یک گیرنده آماده کن",
        "یک متن را به اشتراک بگذار"
      ],
      note:
        "رفتار دقیق تماس یا پیامک به نسخه نصب‌شده برنامه، مجوزهای Android و مشخص بودن گیرنده بستگی دارد."
    },
    en: {
      title: "Communication",
      examples: [
        "Open the dialer for a specific number",
        "Prepare an SMS for a recipient",
        "Prepare an email for a recipient",
        "Share a text"
      ],
      note:
        "Exact call or SMS behavior depends on the installed app version, Android permissions, and an explicitly supplied recipient."
    }
  },
  settings: {
    fa: {
      title: "تنظیمات دستگاه",
      examples: [
        "تنظیمات وای‌فای را باز کن",
        "تنظیمات بلوتوث را باز کن",
        "تنظیمات مکان را باز کن",
        "تنظیمات دسترسی‌پذیری را باز کن",
        "تنظیمات اعلان‌ها را باز کن"
      ]
    },
    en: {
      title: "Device settings",
      examples: [
        "Open Wi-Fi settings",
        "Open Bluetooth settings",
        "Open location settings",
        "Open accessibility settings",
        "Open notification settings"
      ]
    }
  }
};

const HELP = [
  {
    id: "overview",
    fa: "Navid AI یک دستیار هوش مصنوعی فارسی برای Android است و سه حالت متن، صوت و ایجنت دارد.",
    en: "Navid AI is a Persian AI assistant for Android with Text, Voice, and Agent modes."
  },
  {
    id: "permissions",
    fa: "قابلیت‌های ایجنت که به کنترل گوشی مربوط‌اند به مجوزهای Android وابسته‌اند و کاربر باید دسترسی‌های لازم را خودش فعال کند.",
    en: "Agent capabilities that interact with the device depend on Android permissions, which the user must explicitly enable."
  },
  {
    id: "accessibility",
    fa: "برای بعضی قابلیت‌های کنترلی ایجنت، سرویس دسترسی‌پذیری Android باید توسط خود کاربر در تنظیمات گوشی فعال شود.",
    en: "Some Agent control capabilities require Android Accessibility to be enabled by the user in device settings."
  },
  {
    id: "plugin_scope",
    fa: "این پلاگین منبع رسمی اطلاعات و راهنمای Navid AI در ChatGPT است. کنترل واقعی گوشی در اپلیکیشن Android انجام می‌شود، نه در خود پلاگین.",
    en: "This plugin is an official Navid AI information and help source inside ChatGPT. Actual phone control happens in the Android app, not in the plugin."
  }
];

function reply(data) {
  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    structuredContent: data
  };
}

function score(query, text) {
  const q = String(query || "").toLowerCase().trim();
  const hay = String(text || "").toLowerCase();
  if (!q) return 0;
  let result = hay.includes(q) ? 10 : 0;
  for (const token of q.split(/\s+/).filter(Boolean)) {
    if (token.length > 1 && hay.includes(token)) result += 1;
  }
  return result;
}

function createNavidServer() {
  const server = new McpServer(
    { name: "navid-ai-official", version: VERSION },
    {
      instructions:
        "Official read-only Navid AI product and help server. Use these tools for factual information about Navid AI, supported Agent command categories, official links, and setup guidance. Never imply this plugin itself controls an Android phone; device actions run in the Navid AI Android app with user permissions."
    }
  );

  server.registerTool(
    "get_navid_info",
    {
      title: "Get official Navid AI information",
      description:
        "Returns official product information about Navid AI, including platform, modes, and scope.",
      inputSchema: {
        language: z.enum(["fa", "en"]).default("fa")
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async ({ language }) => reply(PRODUCT[language])
  );

  server.registerTool(
    "get_agent_commands",
    {
      title: "Get Navid AI Agent command examples",
      description:
        "Returns official categories and examples of Navid AI Android Agent commands.",
      inputSchema: {
        category: z
          .enum(["all", "apps", "utility", "communication", "settings"])
          .default("all"),
        language: z.enum(["fa", "en"]).default("fa")
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async ({ category, language }) => {
      const keys =
        category === "all"
          ? ["apps", "utility", "communication", "settings"]
          : [category];

      return reply({
        product: "Navid AI",
        language,
        groups: keys.map((key) => ({
          category: key,
          ...COMMANDS[key][language]
        })),
        important:
          language === "fa"
            ? "رفتار دقیق بعضی فرمان‌ها به مجوزهای Android و نسخه نصب‌شده برنامه بستگی دارد. خود پلاگین فرمان کنترلی گوشی را اجرا نمی‌کند."
            : "Exact behavior can depend on Android permissions and the installed app version. The plugin itself does not execute phone-control actions."
      });
    }
  );

  server.registerTool(
    "search_navid_help",
    {
      title: "Search official Navid AI help",
      description:
        "Searches official Navid AI help for setup, permissions, Accessibility, and plugin scope.",
      inputSchema: {
        query: z.string().min(2).max(200),
        language: z.enum(["fa", "en"]).default("fa")
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async ({ query, language }) => {
      const results = HELP.map((item) => ({
        id: item.id,
        text: item[language],
        score: score(query, item[language]) + score(query, item.id)
      }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(({ id, text }) => ({ id, text }));

      return reply({
        query,
        language,
        results:
          results.length > 0
            ? results
            : [
                {
                  id: "no-match",
                  text:
                    language === "fa"
                      ? "مورد دقیقی پیدا نشد. برای اطلاعات عمومی از get_navid_info و برای فرمان‌ها از get_agent_commands استفاده کنید."
                      : "No exact help entry matched. Use get_navid_info for product information or get_agent_commands for command examples."
                }
              ]
      });
    }
  );

  server.registerTool(
    "get_navid_links",
    {
      title: "Get official Navid AI links",
      description:
        "Returns official Navid AI website and demo-video links.",
      inputSchema: {
        language: z.enum(["fa", "en"]).default("fa")
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async ({ language }) =>
      reply({
        name: "Navid AI",
        website:
          language === "fa" ? LINKS.website_fa : LINKS.website_en,
        alternate_language_website:
          language === "fa" ? LINKS.website_en : LINKS.website_fa,
        demo_video: LINKS.demo_video,
        cafe_bazaar:
          language === "fa"
            ? "لینک عمومی کافه‌بازار پس از انتشار نهایی برنامه اضافه می‌شود."
            : "The public Cafe Bazaar link will be added after the store listing is live."
      })
  );

  return server;
}

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "content-type, mcp-session-id, mcp-protocol-version, authorization"
  );
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
}

export default async function handler(req, res) {
  cors(res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (!["POST", "GET", "DELETE"].includes(req.method || "")) {
    res.statusCode = 405;
    res.end("Method not allowed");
    return;
  }

  const server = createNavidServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true
  });

  res.on("close", () => {
    transport.close();
    server.close();
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Navid AI MCP error:", error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Internal MCP server error");
    }
  }
}
