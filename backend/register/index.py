import json
import os
import urllib.request
import urllib.error


def handler(event: dict, context) -> dict:
    """Принимает заявку на регистрацию и отправляет уведомление в Telegram."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        raw_body = event.get("body") or "{}"
        body = json.loads(raw_body) if isinstance(raw_body, str) else raw_body
    except (json.JSONDecodeError, TypeError):
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"ok": False, "error": "Invalid JSON"})}

    name = (body.get("name") or "").strip()
    email = (body.get("email") or "").strip()
    password = (body.get("password") or "").strip()
    telegram = (body.get("telegram") or "").strip()
    game = (body.get("game") or "Не указан").strip()

    if not name or not email or not password:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"ok": False, "error": "Заполните все обязательные поля"}),
        }

    if len(password) < 6:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"ok": False, "error": "Пароль должен быть не менее 6 символов"}),
        }

    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")

    if bot_token and chat_id:
        tg_text = (
            "🎮 <b>Новая регистрация — CyberHost</b>\n\n"
            f"👤 <b>Имя:</b> {name}\n"
            f"📧 <b>Email:</b> {email}\n"
            f"💬 <b>Telegram:</b> {telegram if telegram else '—'}\n"
            f"🎯 <b>Тип сервера:</b> {game}"
        )

        tg_payload = json.dumps({
            "chat_id": chat_id,
            "text": tg_text,
            "parse_mode": "HTML",
        }).encode("utf-8")

        tg_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        req = urllib.request.Request(
            tg_url,
            data=tg_payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            urllib.request.urlopen(req, timeout=10)
        except urllib.error.URLError:
            pass

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "message": "Заявка отправлена"}),
    }