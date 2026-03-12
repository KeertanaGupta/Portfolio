import re

html_content = """
      <!-- Carousels Zone -->
      <div class="certs-zone">
        <!-- Row 1: Moves Right -->
        <div class="certs-row certs-row--1">
          <div class="certs-marquee__inner">
            <div class="certs-marquee__group">
              <!-- R1 -->
            </div>
            <!-- DUPLICATE SET for seamless loop -->
            <div class="certs-marquee__group" aria-hidden="true">
              <!-- R1 -->
            </div>
          </div>
        </div>

        <!-- Row 2: Moves Left -->
        <div class="certs-row certs-row--2">
          <div class="certs-marquee__inner">
            <div class="certs-marquee__group">
              <!-- R2 -->
            </div>
            <!-- DUPLICATE SET for seamless loop -->
            <div class="certs-marquee__group" aria-hidden="true">
              <!-- R2 -->
            </div>
          </div>
        </div>
      </div>
"""

r1 = [
    ("Postman API Fundamentals Student Expert", "Postman"),
    ("Data Analysis Job Simulation", "Deloitte Australia (Forage)"),
    ("Prompt Engineering for GPT", "Great Learning"),
    ("Introduction to Machine Learning", "IIT Madras (NPTEL)"),
    ("Python for Data Science", "IIT Madras (NPTEL)"),
]

r2 = [
    ("Programming in Java", "IIT Kharagpur (NPTEL)"),
    ("DSA using Java", "IIT Kharagpur (NPTEL)"),
    ("Programming in Modern C++", "IIT Kharagpur (NPTEL)"),
    ("DBMS", "IIT Kharagpur (NPTEL)"),
]

def make_cards(data):
    out = []
    for title, issuer in data:
        out.append(f'''              <div class="cert-card-apple">
                <div class="cert-card-apple__image">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="cert-card-apple__icon"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <div class="cert-card-apple__details">
                  <div class="cert-card-apple__title">{title}</div>
                  <div class="cert-card-apple__issuer">{issuer}</div>
                </div>
              </div>''')
    return "\n".join(out)

html = html_content.replace("<!-- R1 -->", make_cards(r1)).replace("<!-- R2 -->", make_cards(r2))

print(html)
