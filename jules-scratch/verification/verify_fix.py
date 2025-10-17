from playwright.sync_api import Page, expect

def test_app_loads(page: Page):
    """
    This test verifies that the application loads correctly.
    """
    # 1. Arrange: Go to the local development server.
    page.goto("http://localhost:5173")

    # 2. Assert: Confirm the page has loaded by checking for a known element.
    # I'll check for the root div.
    expect(page.locator("#root")).to_be_visible()

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")