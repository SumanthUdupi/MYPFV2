from playwright.sync_api import Page, expect

def test_nebula_background(page: Page):
    """
    This test verifies that the Nebula background is rendered on the homepage.
    """
    # 1. Arrange: Go to the local development server.
    page.goto("http://localhost:5173/")

    # 2. Act: Wait for the canvas element to be visible.
    # This indicates that the Nebula background has been rendered.
    canvas = page.locator("canvas")
    expect(canvas).to_be_visible(timeout=10000)

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png", timeout=60000)
