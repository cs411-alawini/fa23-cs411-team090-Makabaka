import json
import random
from faker import Faker
from faker_food import FoodProvider

# Generate random restaurant names and menu item names
fake = Faker()
fake.add_provider(FoodProvider)

# number
n = 100  # number of restaurants
restaurant_rate_min = 1.5
restaurant_rate_max = 5.0
menu_items_min = 5
menu_items_max = 10
menu_item_price_min = 10
menu_item_price_max = 50
type_list = ['fastfood', 'Japanese food', 'Chinese food', 'Grill', 'Korean food', 'Thai food', 'India food', 'Mexican food', 'Other']
restaurant_data = []
restaurants = []

# Start generate restaurants data
for i in range(n):
    restaurant_id = i + 1  # Start from ID = 1
    restaurant_name = fake.company()
    restaurant_address = fake.address()
    restaurant_rate = round( random.uniform(restaurant_rate_min, restaurant_rate_max), 1)
    restaurant_type = random.choice(type_list)
    restaurant_menu = []
    # Random number of menu items
    for j in range(random.randint(menu_items_min, menu_items_max)):
        menu_item_id = len(restaurant_menu) + 1  # ID
        menu_item = {
            'dish_id': menu_item_id,
            'dish_name': fake.dish(),
            'dish_price': round(random.uniform(menu_item_price_min, menu_item_price_max), 2),
            'recommand_numebr': round(random.uniform(1, 5), 1)
        }
        restaurant_menu.append(menu_item)
    restaurant_data_item = {
        'restaurant_id': restaurant_id,
        'restaurant_name': restaurant_name,
        'address': restaurant_address,
        'restaurant_rating': restaurant_rate,
        'restaurant_type': restaurant_type,
        'restaurant_menu': restaurant_menu,
        'restaurant_avg_price': round(sum([menu_item['dish_price'] for menu_item in restaurant_menu]) / len(restaurant_menu), 2)
    }
    restaurant_data.append(restaurant_data_item)
    restaurant_item = {
        'restaurant_id': restaurant_id,
        'restaurant_name': restaurant_name,
        'restaurant_address': restaurant_address,
        'restaurant_rating': restaurant_rate,
        'restaurant_type': restaurant_type
    }
    restaurants.append(restaurant_item)

# Writing restaurant data to a file
with open('restaurant_data.json', 'w') as f:
    json.dump(restaurant_data, f, indent=2)

with open('restaurants.json', 'w') as f:
    json.dump(restaurants, f, indent=2)
