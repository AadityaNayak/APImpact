import os
from random import randint
from datetime import datetime, timedelta  # Import timedelta

# Set the start and end date
start_date = "2023-07-15"
end_date = "2023-07-25"

# Convert start and end dates to datetime objects
start_datetime = datetime.strptime(start_date, "%Y-%m-%d")
end_datetime = datetime.strptime(end_date, "%Y-%m-%d")

# Calculate the number of days between start and end
total_days = (end_datetime - start_datetime).days

# Iterate over each day
for i in range(total_days + 1):
    date = start_datetime + timedelta(days=i)
    
    # Generate a random number of commits for each day (1 to 10 commits)
    for j in range(randint(1, 10)):
        d = date.strftime("%Y-%m-%d %H:%M:%S")
        with open('file.txt', 'a') as file:
            file.write(d + '\n')
        os.system('git add .')
        os.system('git commit --date="' + d + '" -m "commit"')

os.system('git push -u origin main')