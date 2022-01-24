const db = require('../models/db.js');
const User = db.user;
const UserChallenges = db.user_challenge;
const UserBadges = db.user_badge;
const BadgeBoard = db.badge_leaderboard;
const Notification = db.notification;

exports.refreshMets = async () => {
    const users = await User.findAll({ attributes: ['id_user', 'points'], where: {is_admin: 0} })
    const leaderboard = await db.sequelize.query('CALL GetleaderboardWithID ()');

    for (let i = 0; i < leaderboard.length; i++) {
        const user = leaderboard[i];
        let position = user.position;
        let new_points;
        let badge;

        if(user.mets != 0){
            if (position == 1) {
                await UserBadges.create({ id_user: user.id_user, id_badge_board: 1});
                badge = await BadgeBoard.findOne({attributes: ['points'], where: { id_badge_board: 1 }});
                new_points = badge.points + user.points
                await User.update({ points: new_points}, { where: { id_user: user.id_user } });
                await Notification.create({description: "Parabéns! Ficas-te no primeiro lugar!", id_user: user.id_user});
            }
            if (position == 2) {
                await UserBadges.create({ id_user: user.id_user, id_badge_board: 2});
                badge = await BadgeBoard.findOne({attributes: ['points'], where: { id_badge_board: 2 }});
                new_points = badge.points + user.points
                await User.update({ points: new_points}, { where: { id_user: user.id_user } });
                await Notification.create({description: "Parabéns! Ficas-te no segundo lugar!", id_user: user.id_user});
            }
            if (position == 3) {
                await UserBadges.create({ id_user: user.id_user, id_badge_board: 3});
                badge = await BadgeBoard.findOne({attributes: ['points'], where: { id_badge_board: 3 }});
                new_points = badge.points + user.points
                await User.update({ points: new_points}, { where: { id_user: user.id_user } });
                await Notification.create({description: "Parabéns! Ficas-te no terceiro lugar!", id_user: user.id_user});
            }
            if ((position <= (users.length * 0.05)) && (position > 3)) {
                await UserBadges.create({ id_user: user.id_user, id_badge_board: 4});
                badge = await BadgeBoard.findOne({attributes: ['points'], where: { id_badge_board: 4 }});
                new_points = badge.points + user.points
                await User.update({ points: new_points}, { where: { id_user: user.id_user } });
                await Notification.create({description: "Parabéns! Ficas-te no Top 5%!", id_user: user.id_user});
            }
            if (position <= (users.length * 0.1) && (position > 3)) {
                await UserBadges.create({ id_user: user.id_user, id_badge_board: 5});
                badge = await BadgeBoard.findOne({attributes: ['points'], where: { id_badge_board: 5 }});
                new_points = badge.points + user.points
                await User.update({ points: new_points}, { where: { id_user: user.id_user } });
                await Notification.create({description: "Parabéns! Ficas-te no Top 10%!", id_user: user.id_user});
            }
            if (position <= (users.length * 0.25) && (position > 3)) {
                await UserBadges.create({ id_user: user.id_user, id_badge_board: 6});
                badge = await BadgeBoard.findOne({attributes: ['points'], where: { id_badge_board: 6 }});
                new_points = badge.points + user.points
                await User.update({ points: new_points}, { where: { id_user: user.id_user } });
                await Notification.create({description: "Parabéns! Ficas-te no Top 25%!", id_user: user.id_user});
            }
            if (position <= (users.length * 0.5) && (position > 3)) {
                await UserBadges.create({ id_user: user.id_user, id_badge_board: 7});
                badge = await BadgeBoard.findOne({attributes: ['points'], where: { id_badge_board: 7 }});
                new_points = badge.points + user.points
                await User.update({ points: new_points}, { where: { id_user: user.id_user } });
                await Notification.create({description: "Parabéns! Ficas-te no Top 50%!", id_user: user.id_user});
            }
        }else{
            new_points = user.points - 5000;
            if(new_points <= 0){
                new_points = 0;
            }
            await User.update({ points: new_points}, { where: { id_user: user.id_user } });
        }
    }

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        await User.update({ mets: 0 }, { where: { id_user: user.id_user } });
    }
    console.log('Updated users mets');
}

exports.refreshUserChallenges = async () => {
    const user_challenges = await UserChallenges.findAll({ attributes: ['id_user'] })
    for (let i = 0; i < user_challenges.length; i++) {
        const user_challenge = user_challenges[i];
        await UserChallenges.update({ progress: '00:00:00', completed: 0 }, { where: { id_user: user_challenge.id_user } });
    }
    console.log('Updated user_challenges');
}