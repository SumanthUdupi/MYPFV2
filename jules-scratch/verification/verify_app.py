from playwright.sync_api import Page, expect, sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        try:
            page.goto("http://localhost:5173/MYPFV2/")
            expect(page.locator("#root")).to_be_visible()
            page.screenshot(path="jules-scratch/verification/verification.png")
        except Exception as e:
            print(e)
        finally:
            browser.close()

run()