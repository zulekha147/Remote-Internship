import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ImageSourcePropType } from 'react-native';

// Static imports for local images
const localImages: { [key: string]: ImageSourcePropType } = {
  '../react-native.png': require('../react-native.png'),
  '../java3.jpg': require('../java3.jpg'),
  '../js.jpg': require('../js.jpg')
};

// Function to dynamically get image source
const getImageSource = (imagePath: string): ImageSourcePropType => {
  if (localImages[imagePath]) {
    return localImages[imagePath];
  }
  return { uri: imagePath }; // For remote images
};

// Define TypeScript types for your post data
interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  caption: string;
}

// Sample blog posts data
const posts: Post[] = [
  {
    id: 1,
    title: "The Language That Taught Me Discipline",
    content: "Java will always hold a special place in my heart because it taught me the importance of structure and discipline in coding. ",
    image: "../java3.jpg",
    caption: "#Java #ProgrammingLanguage #DisciplineInCoding"
  },
  {
    id: 2,
    title: "The Language That Stole My Heart",
    content: "I love JavaScript because it's like the Swiss Army knife of programming languages versatile, flexible, and always up for a challenge. ",
    image: "../js.jpg",
    caption: "#JavaScript #ProgrammingLanguage #FavoriteLanguage"
  },
  {
    id: 3,
    title: "Building Bridges with React Native",
    content: "I love React Native because it lets me build seamless mobile experiences that bridge the gap between iOS and Android",
    image: "../react-native.png",
    caption: "#ReactNative #JavaScript #MobileApps"
  }
];

const App: React.FC = () => {
  const [blogPosts, setBlogPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    setBlogPosts(posts);
  }, []);

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <Image source={getImageSource(item.image)} style={styles.postImage} />
      <Text style={styles.postCaption}>{item.caption}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={blogPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  postCaption: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default App;
