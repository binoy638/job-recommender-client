import { RichTextEditor } from '@mantine/rte';

interface Props {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const TextEditor = ({ value, placeholder, onChange }: Props) => {
  return (
    <RichTextEditor
      controls={[
        ['bold', 'italic', 'underline'],
        ['unorderedList', 'orderedList', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        ['sup', 'sub'],
        ['alignLeft', 'alignCenter', 'alignRight'],
      ]}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default TextEditor;
