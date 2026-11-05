import DocList from '../DocList';
export default function Pages() {
  return <DocList kind="pages" base="/admin/pages" title="Pages" cols={[['template', 'Template']]} />;
}
