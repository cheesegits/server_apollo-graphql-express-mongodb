export default {
    Query: {
        allUsers: async(parent, args, {
            User
        }) => {
            const users = await User.find();
            return users.map((x) => {
                const user = x;
                user._id = user._id.toString();
                return user;
            });
        }
    },
    Mutation: {
        createUser: async(parent, args, {
            User
        }) => {
            const user = await new User(args).save();
            user._id = user._id.toString();
            return user;
        },
        updateUser: async(parents, args, {
            User
        }) => {
            const updatedUser = await User.findById(args._id);
            updatedUser.username = args.username;
            updatedUser.save();
            return updatedUser;
        },
        deleteUser: async(parent, args, {
            User
        }) => {
            const deletedUser = await User.findByIdAndRemove(args._id);
            deletedUser._id = deletedUser._id.toString();
            return deletedUser;
        }
    }
};