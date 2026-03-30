from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create users (superheroes)
        users_data = [
            {'username': 'ironman', 'email': 'tony@avengers.com', 'password': 'stark123', 'age': 45, 'fitness_level': 'advanced'},
            {'username': 'captainamerica', 'email': 'steve@avengers.com', 'password': 'shield123', 'age': 105, 'fitness_level': 'advanced'},
            {'username': 'blackwidow', 'email': 'natasha@avengers.com', 'password': 'spy123', 'age': 35, 'fitness_level': 'advanced'},
            {'username': 'thor', 'email': 'thor@asgard.com', 'password': 'mjolnir123', 'age': 1500, 'fitness_level': 'advanced'},
            {'username': 'hulk', 'email': 'bruce@avengers.com', 'password': 'smash123', 'age': 49, 'fitness_level': 'advanced'},
            {'username': 'batman', 'email': 'bruce@gotham.com', 'password': 'wayne123', 'age': 40, 'fitness_level': 'advanced'},
            {'username': 'superman', 'email': 'clark@metropolis.com', 'password': 'krypton123', 'age': 35, 'fitness_level': 'advanced'},
            {'username': 'wonderwoman', 'email': 'diana@themyscira.com', 'password': 'amazon123', 'age': 3000, 'fitness_level': 'advanced'},
            {'username': 'flash', 'email': 'barry@centralcity.com', 'password': 'speed123', 'age': 28, 'fitness_level': 'advanced'},
            {'username': 'greenlantern', 'email': 'hal@oa.com', 'password': 'ring123', 'age': 35, 'fitness_level': 'intermediate'},
        ]

        users = []
        for user_data in users_data:
            user = User(**user_data)
            user.save()
            users.append(user)
            self.stdout.write(f'Created user: {user.username}')

        # Create teams
        team_marvel = Team(
            name='Team Marvel',
            members=['ironman', 'captainamerica', 'blackwidow', 'thor', 'hulk']
        )
        team_marvel.save()
        self.stdout.write(f'Created team: {team_marvel.name}')

        team_dc = Team(
            name='Team DC',
            members=['batman', 'superman', 'wonderwoman', 'flash', 'greenlantern']
        )
        team_dc.save()
        self.stdout.write(f'Created team: {team_dc.name}')

        # Create activities
        activities_data = [
            {'username': 'ironman', 'activity_type': 'Flight Training', 'duration': 60, 'date': date(2024, 1, 15)},
            {'username': 'captainamerica', 'activity_type': 'Shield Throwing', 'duration': 45, 'date': date(2024, 1, 15)},
            {'username': 'blackwidow', 'activity_type': 'Martial Arts', 'duration': 90, 'date': date(2024, 1, 16)},
            {'username': 'thor', 'activity_type': 'Hammer Training', 'duration': 120, 'date': date(2024, 1, 16)},
            {'username': 'hulk', 'activity_type': 'Strength Training', 'duration': 30, 'date': date(2024, 1, 17)},
            {'username': 'batman', 'activity_type': 'Obstacle Course', 'duration': 75, 'date': date(2024, 1, 15)},
            {'username': 'superman', 'activity_type': 'Super Speed Running', 'duration': 15, 'date': date(2024, 1, 15)},
            {'username': 'wonderwoman', 'activity_type': 'Lasso Training', 'duration': 50, 'date': date(2024, 1, 16)},
            {'username': 'flash', 'activity_type': 'Speed Running', 'duration': 5, 'date': date(2024, 1, 16)},
            {'username': 'greenlantern', 'activity_type': 'Ring Constructs', 'duration': 40, 'date': date(2024, 1, 17)},
        ]

        for activity_data in activities_data:
            activity = Activity(**activity_data)
            activity.save()
            self.stdout.write(f'Created activity: {activity.username} - {activity.activity_type}')

        # Create leaderboard
        leaderboard_data = [
            {'username': 'thor', 'score': 950},
            {'username': 'captainamerica', 'score': 900},
            {'username': 'blackwidow', 'score': 875},
            {'username': 'ironman', 'score': 850},
            {'username': 'superman', 'score': 920},
            {'username': 'wonderwoman', 'score': 910},
            {'username': 'batman', 'score': 860},
            {'username': 'flash', 'score': 880},
            {'username': 'hulk', 'score': 800},
            {'username': 'greenlantern', 'score': 780},
        ]

        for lb_data in leaderboard_data:
            lb = Leaderboard(**lb_data)
            lb.save()
            self.stdout.write(f'Created leaderboard entry: {lb.username} - {lb.score}')

        # Create workouts
        workouts_data = [
            {
                'name': 'Iron Man Cardio',
                'description': 'High-intensity cardio workout inspired by Iron Man suit training. Includes sprint intervals and circuit training.',
                'duration': 45,
                'intensity': 'high'
            },
            {
                'name': 'Captain America Strength',
                'description': 'Full-body strength training workout. Focus on compound movements including squats, deadlifts, and bench press.',
                'duration': 60,
                'intensity': 'high'
            },
            {
                'name': 'Black Widow Flexibility',
                'description': 'Flexibility and agility workout. Yoga-inspired stretches combined with martial arts movement drills.',
                'duration': 30,
                'intensity': 'medium'
            },
            {
                'name': 'Thor Power Training',
                'description': 'Explosive power training workout. Olympic lifting movements and plyometrics.',
                'duration': 50,
                'intensity': 'high'
            },
            {
                'name': 'Flash Speed Workout',
                'description': 'Sprint training and speed drills. Short explosive bursts with active recovery.',
                'duration': 25,
                'intensity': 'high'
            },
            {
                'name': 'Wonder Woman Endurance',
                'description': 'Long-duration endurance training. Mix of running, swimming, and rowing.',
                'duration': 90,
                'intensity': 'medium'
            },
        ]

        for workout_data in workouts_data:
            workout = Workout(**workout_data)
            workout.save()
            self.stdout.write(f'Created workout: {workout.name}')

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data!'))
