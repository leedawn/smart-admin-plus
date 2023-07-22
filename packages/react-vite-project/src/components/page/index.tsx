import Titling from './Titling';
import Section from './Section';

export default function Page() {
  return (
    <Section>
      <Titling>一级标题</Titling>
      <Titling>一级标题</Titling>
      <Section>
        <Titling>二级标题</Titling>
        <Titling>二级标题</Titling>
      </Section>
    </Section>
  );
}
