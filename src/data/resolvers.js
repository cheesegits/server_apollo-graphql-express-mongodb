export default {
    Query: {
        allPlayers: async(parent, args, {
            Player
        }) => {
            const players = await Player.find();
            return players.map((x) => {
                const player = x;
                player._id = player._id.toString();
                return player;
            });
        }
    },
    Mutation: {
        createPlayer: async(parent, args, {
            Player
        }) => {
            const player = await new Player(args).save();
            player._id = player._id.toString();
            return player;
        },
        updatePlayer: async(parents, args, {
            Player
        }) => {
            const updatedPlayer = await Player.findById(args._id);
            updatedPlayer.username = args.username;
            updatedPlayer.save();
            return updatedPlayer;
        },
        deletePlayer: async(parent, args, {
            Player
        }) => {
            const deletedPlayer = await Player.findByIdAndRemove(args._id);
            deletedPlayer._id = deletedPlayer._id.toString();
            return deletedPlayer;
        }
    }
};