from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "tracy-smog-center-coupon.pdf"
PUBLIC = ROOT / "public" / "tracy-smog-center-coupon.pdf"
LOGO = ROOT / "public" / "tracy-smog-center-logo.png"


def build_coupon(path: Path) -> None:
    width, height = letter
    pdf = canvas.Canvas(str(path), pagesize=letter)
    pdf.setTitle("Tracy Smog Center - $10 Off Coupon")
    pdf.setAuthor("Tracy Smog Center")
    pdf.setSubject("Printable website coupon")

    red = HexColor("#B91E32")
    blue = HexColor("#2166B1")
    charcoal = HexColor("#202123")
    muted = HexColor("#5F6267")
    soft_red = HexColor("#FAECEF")

    pdf.setFillColor(HexColor("#F5F6F7"))
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    card_x, card_y = 54, 270
    card_w, card_h = width - 108, 270
    pdf.setFillColor(white)
    pdf.setStrokeColor(HexColor("#D9DDE1"))
    pdf.setLineWidth(1)
    pdf.roundRect(card_x, card_y, card_w, card_h, 6, stroke=1, fill=1)

    pdf.drawImage(str(LOGO), card_x + 24, card_y + card_h - 88, width=64, height=64, preserveAspectRatio=True, mask="auto")
    pdf.setFillColor(charcoal)
    pdf.setFont("Helvetica-Bold", 15)
    pdf.drawString(card_x + 102, card_y + card_h - 46, "TRACY SMOG CENTER")
    pdf.setFillColor(muted)
    pdf.setFont("Helvetica", 9)
    pdf.drawString(card_x + 102, card_y + card_h - 63, "STAR-certified, test-only smog inspections")
    pdf.setStrokeColor(HexColor("#E4E6E8"))
    pdf.line(card_x + 24, card_y + card_h - 104, card_x + card_w - 24, card_y + card_h - 104)

    offer_y = card_y + 72
    pdf.setFillColor(red)
    pdf.roundRect(card_x + 24, offer_y, 156, 82, 4, stroke=0, fill=1)
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 30)
    pdf.drawCentredString(card_x + 102, offer_y + 43, "$10 OFF")
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawCentredString(card_x + 102, offer_y + 22, "WEBSITE COUPON")

    copy_x = card_x + 204
    pdf.setFillColor(red)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(copy_x, offer_y + 67, "SAVE ON YOUR NEXT SMOG CHECK")
    pdf.setFillColor(charcoal)
    pdf.setFont("Helvetica-Bold", 13)
    pdf.drawString(copy_x, offer_y + 45, "Present before service")
    pdf.setFillColor(muted)
    pdf.setFont("Helvetica", 8.5)
    pdf.drawString(copy_x, offer_y + 27, "Final eligibility, exclusions, expiration, and stacking")
    pdf.drawString(copy_x, offer_y + 14, "terms are subject to shop approval. One coupon per visit.")

    pdf.setFillColor(soft_red)
    pdf.rect(card_x + 1, card_y + 1, card_w - 2, 46, stroke=0, fill=1)
    pdf.setFillColor(charcoal)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(card_x + 24, card_y + 28, "10 W Grant Line Rd, Tracy, CA")
    pdf.setFillColor(blue)
    pdf.drawRightString(card_x + card_w - 24, card_y + 28, "(209) 834-2760")
    pdf.setFillColor(muted)
    pdf.setFont("Helvetica", 7.5)
    pdf.drawCentredString(width / 2, card_y - 24, "Print this page or show the coupon on your phone before service.")

    pdf.setDash(4, 4)
    pdf.setStrokeColor(HexColor("#AEB3B8"))
    pdf.line(card_x, card_y - 42, card_x + card_w, card_y - 42)
    pdf.setDash()
    pdf.setFillColor(muted)
    pdf.setFont("Helvetica", 7)
    pdf.drawCentredString(width / 2, 34, "Tracy Smog Center | tracy-smog-center.travelingwithabeer.chatgpt.site")

    pdf.showPage()
    pdf.save()


if __name__ == "__main__":
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    build_coupon(OUTPUT)
    PUBLIC.write_bytes(OUTPUT.read_bytes())
    print(OUTPUT)
