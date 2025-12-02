export const mockPartsIterator = {
  //it came from chatgpt, take a look after
  async *[Symbol.asyncIterator]() {
    yield {
      file: Buffer.from("file-content"),
      filename: "test.jpg",
      fieldname: "file",
      type: "image/jpeg",
      encoding: "utf-8",
      mimetype: "image/jpeg",
    };

    yield { fieldname: "title", value: "Product test" };
    yield { fieldname: "description", value: "Description test" };
    yield { fieldname: "price", value: "100" };
    yield { fieldname: "available", value: "true" };
  },
};
