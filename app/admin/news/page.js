import DocList from '../DocList';
export default function News() {
  return <DocList kind="posts" base="/admin/news" title="News & case studies" cols={[['kind', 'Type'], ['category', 'Category']]} />;
}
