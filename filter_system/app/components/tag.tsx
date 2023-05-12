import { useEffect, useState } from 'react';

interface TagProps {
  tag: string;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

const Tag = ({ tag, selectedTags, setSelectedTags }: TagProps) => {
  const [selected, setSelected] = useState(selectedTags.includes(tag));

 
  const handleClick = () => {
    setSelected(!selected);
    if (selected) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className={`tag ${selected ? 'selected' : ''}`} onClick={handleClick}>
      {tag}
    </div>
  );
};

interface TagsProps {
    tags: string[];
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  }

  const Tags = ({ tags, selectedTags, setSelectedTags }: TagsProps) => {
    //   const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  return (
    <>
      {tags.map((tag: string) => (
        <Tag key={tag} tag={tag} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      ))}
    </>
  );
};

export default Tags