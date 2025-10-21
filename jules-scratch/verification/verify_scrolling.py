from playwright.sync_api import Page, expect
import time

def test_cinematic_scrolling(page: Page):
    """
    This test verifies that the cinematic scrolling effects are working as expected.
    """
    # 1. Arrange: Go to the application's homepage.
    page.goto("http://localhost:3000")

    # 2. Act: Scroll down the page.
    page.mouse.wheel(0, 3000)
    time.sleep(5) # Wait for the animations to play

    # 3. Screenshot: Capture the final result for visual verification.
    print("Taking screenshot...")
    page.screenshot(path="jules-scratch/verification/cinematic-scrolling.png")
    print("Screenshot taken.")
