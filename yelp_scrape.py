import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import pyautogui
import tkinter as tk
import re

id_match = re.compile(r'data-review-id="(.+?)"')

# Initialize the Chrome driver
driver = webdriver.Chrome()

# Function to find coordinates of a Selenium web element
def get_element_coordinates(element):
    window_position = driver.get_window_rect()
    location = element.location
    size = element.size
    x = location['x'] + size['width']/2 + window_position['x']
    scroll_y = driver.execute_script("return window.scrollY;")
    y = location['y'] + size['height']/2 - scroll_y + window_position['y'] + 140
    return x, y

    # Function to scroll an element into view and then get its coordinates
def scroll_to_element_and_get_coordinates(driver, element):
    # Scroll element into view
    driver.execute_script("arguments[0].scrollIntoView();", element)
    # Wait for the scroll to complete
    time.sleep(1)
    # Get coordinates using the existing function
    return get_element_coordinates(element)

def show_click_position(x, y):
    # Use Tkinter to create a small window at the click position
    root = tk.Tk()
    root.title("Click Position")
    label = tk.Label(root, text="Click will happen here!", fg="red")
    label.pack()
    root.geometry(f"+{int(x)}+{int(y)}")  # Set the position of the window
    root.lift()
    root.attributes("-topmost", True)
    root.after(2000, root.destroy)  # Auto close window after 2000ms
    root.mainloop()

try:
    # Navigate to the webpage
    driver.get("https://www.yelp.com/biz/european-auto-service-reseda")
    time.sleep(2)  # Allow some time for the page to load


    for i in range(10):
        # Updated section to scroll to the button, then click using PyAutoGUI
        buttons = driver.find_elements(By.XPATH, "//button[@aria-label='Menu']")
        for button in buttons:
            x, y = scroll_to_element_and_get_coordinates(driver, button)
            # show_click_position(x, y)
            pyautogui.moveTo(x, y)
            pyautogui.click()

            time.sleep(1)  # Wait for the menu to appear

            # Find and click the 'Embed review' menu item
            embed_menu = driver.find_element(By.XPATH, "//div[span[text()='Embed review']]")
            x, y = get_element_coordinates(embed_menu)
            pyautogui.moveTo(x, y)
            pyautogui.click()

            time.sleep(2)  # Wait for the popup to appear

            # Extract the content from the input field
            embed_code_field = driver.find_element(By.ID, "embed-code-field")
            embed_code = embed_code_field.get_attribute('value')
            with open("yelp_embed_codes.txt", "a") as f:
                match = id_match.search(embed_code)
                if match:
                    f.write(match.group(1))
                else:
                    f.write(embed_code)
                f.write("\n")
            pyautogui.hotkey('esc') # Close the popup
        
        next_button = driver.find_element(By.XPATH, "//a[@aria-label='Next']")
        x, y = scroll_to_element_and_get_coordinates(driver, next_button)
        pyautogui.moveTo(x, y)
        pyautogui.click()
        time.sleep(2)


finally:
    # Close the driver
    driver.quit()
