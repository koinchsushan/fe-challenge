import '../src/styles/global.css';

const withTheme = (Story, context) => {
  const theme = context.globals.theme || 'brand-a';
  return (
    <div
      data-theme={theme}
      style={{ background: 'var(--surface-page)', minHeight: '100vh', padding: '24px' }}
    >
      <Story />
    </div>
  );
};

export const decorators = [withTheme];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Switch between Brand A and Brand B',
    defaultValue: 'brand-a',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'brand-a', title: 'Brand A' },
        { value: 'brand-b', title: 'Brand B' },
      ],
      showName: true,
    },
  },
};

export const parameters = {
  backgrounds: { disable: true },
  layout: 'padded',
};