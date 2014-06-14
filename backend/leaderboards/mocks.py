# fake data to get started without anything in the db
from leaderboards.models import Game, User, Tag, Speedrun

game = Game(title="Ocarina of Time")

user1 = User(name="maxx")
user2 = User(name="Kiyura")

speedrun1 = Speedrun(
    user=user1,
    seconds=1573,
    game=game,
    video="https://www.youtube.com/watch?v=1a2b3c4d5e6",
    description="my pb"
)

speedrun2 = Speedrun(
    user=user2,
    seconds=1800,
    game=game,
    video="https://www.youtube.com/watch?v=6e5d4c3b2a1",
    description="what game is this"
)