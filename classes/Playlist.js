class Playlist {
    constructor(
        topicName,
        category,
        topics
    ) {
        this.name = topicName;
        this.category = category;
        this.topics = topics || [];
    }
}