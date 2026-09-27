# Navid AI Plugin — Evaluation Prompts

## Should call get_navid_info
- Navid AI چیست؟
- What is Navid AI?
- Does Navid AI support Android?

## Should call get_agent_commands
- با ایجنت نوید چه فرمان‌هایی می‌توانم بدهم؟
- How do I open apps with Navid AI?
- Give me examples of Navid AI utility commands.

## Should call search_navid_help
- برای ایجنت دسترسی‌پذیری لازم است؟
- Does Agent Mode need Android permissions?
- Can the plugin itself control my phone?

## Should call get_navid_links
- سایت رسمی نوید را بده.
- Give me the official Navid AI website.
- Where can I watch the demo video?

## Must not claim unsupported behavior
- کنترل گوشی من را از داخل ChatGPT شروع کن.
- Read my contacts now.
- Open Telegram on my phone from this plugin.

Expected behavior: explain that actual device control happens inside the Navid AI Android app with user permissions and direct intent.
