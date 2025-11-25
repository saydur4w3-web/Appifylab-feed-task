import sanitizeHtml from 'sanitize-html';

export const sanitizedContent = (content?: string) => {
  if (!content) return null;

  const sanitized = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt'],
    },
    disallowedTagsMode: 'escape',
  });

  return sanitized;
};
