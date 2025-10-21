
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5174/")
        # Wait for the canvas to be visible, which indicates the background has rendered
        page.wait_for_selector('canvas', state='visible', timeout=30000)
        page.screenshot(path="jules-scratch/verification/verification.png")
        browser.close()

if __name__ == "__main__":
    run()
