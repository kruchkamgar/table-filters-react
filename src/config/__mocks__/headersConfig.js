
const headersConfigMock = jest.createMockFromModule('../headersConfig.js');

// headersConfig = {genre: {caseSensitivity: true}, city:false}; })
headersConfigMock.genre = { caseSensitivity: true }
headersConfigMock.city = false

export default headersConfigMock
