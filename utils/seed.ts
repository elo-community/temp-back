import { AppDataSource } from "../data-source";
import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";
import { SportCategory } from "../entities/SportCategory";
import { User } from "../entities/User";

export const seedSportCategories = async () => {
    const sportCategoryRepository = AppDataSource.getRepository(SportCategory);

    // 기존 데이터 확인
    const existingCategories = await sportCategoryRepository.find();
    if (existingCategories.length > 0) {
        console.log("Sport categories already exist, skipping seed");
        return;
    }

    const categories = [
        { name: "테니스", sortOrder: 1 },
        { name: "배드민턴", sortOrder: 2 },
        { name: "탁구", sortOrder: 3 },
        { name: "당구", sortOrder: 4 },
        { name: "바둑", sortOrder: 5 },
        { name: "체스", sortOrder: 6 },
        { name: "자유글", sortOrder: 7 },
        { name: "공지사항", sortOrder: 8 }
    ];

    try {
        await sportCategoryRepository.save(categories);
        console.log("Sport categories seeded successfully!");
    } catch (error) {
        console.error("Error seeding sport categories:", error);
    }
};

export const seedUsers = async () => {
    const userRepository = AppDataSource.getRepository(User);

    // 기존 데이터 확인
    const existingUsers = await userRepository.find();
    if (existingUsers.length > 0) {
        console.log("Users already exist, skipping seed");
        return;
    }

    const users = [
        {
            walletAddress: "0x1234567890123456789012345678901234567890",
            nickname: "Player1",
            email: "player1@example.com",
            password: "password123",
            tokenAmount: 1000,
            profileImageUrl: "https://example.com/player1.jpg"
        },
        {
            walletAddress: "0x0987654321098765432109876543210987654321",
            nickname: "Player2",
            email: "player2@example.com",
            password: "password123",
            tokenAmount: 1000,
            profileImageUrl: "https://example.com/player2.jpg"
        }
    ];

    try {
        await userRepository.save(users);
        console.log("Users seeded successfully!");
    } catch (error) {
        console.error("Error seeding users:", error);
    }
};

export const seedPosts = async () => {
    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);
    const sportCategoryRepository = AppDataSource.getRepository(SportCategory);

    // 기존 데이터 확인
    const existingPosts = await postRepository.find();
    if (existingPosts.length > 0) {
        console.log("Posts already exist, skipping seed");
        return;
    }

    // User와 SportCategory 엔티티 조회
    const author = await userRepository.findOne({ where: { id: 1 } });
    const sportCategory = await sportCategoryRepository.findOne({ where: { id: 2 } });

    if (!author || !sportCategory) {
        console.error("User or SportCategory not found for seeding posts");
        return;
    }

    const posts = [
        {
            author,
            sportCategory,
            title: "일반",
            content: "글 A\n\n**글 B 어쩌구\\~**\n\n저쩌구라 그랬습니다.",
            type: "일반",
            isHidden: false,
            tokenReward: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    try {
        const savedPosts = await postRepository.save(posts);
        console.log("Posts seeded successfully!");
        return savedPosts;
    } catch (error) {
        console.error("Error seeding posts:", error);
    }
};

export const seedComments = async () => {
    const commentRepository = AppDataSource.getRepository(Comment);
    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Post);

    // 기존 데이터 확인
    const existingComments = await commentRepository.find();
    if (existingComments.length > 0) {
        console.log("Comments already exist, skipping seed");
        return;
    }

    // Post가 있는지 확인하고 첫 번째 Post의 ID 사용
    const posts = await postRepository.find();

    if (posts.length === 0) {
        console.log("No posts found, creating a post first...");
        await seedPosts();
        const newPosts = await postRepository.find();
        if (newPosts.length === 0) {
            console.error("Failed to create posts for comments");
            return;
        }
    }

    const firstPost = posts[0] || (await postRepository.find())[0];
    const user = await userRepository.findOne({ where: { id: 1 } });

    if (!user) {
        console.error("User not found for seeding comments");
        return;
    }

    const comments = [
        {
            user,
            post: firstPost,
            content: "컨텐츠에요",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    try {
        await commentRepository.save(comments);
        console.log("Comments seeded successfully!");
    } catch (error) {
        console.error("Error seeding comments:", error);
    }
}; 