import { CreateLink } from "@/domain/features/create-link";

export class CreateLinkService implements CreateLink {
  async execute(input: CreateLink.Input): Promise<CreateLink.Output> {
    const utm = JSON.stringify(input.utm);
    const pixels = JSON.stringify(input.pixels);

    return { 
      ...input,
      id: "any_id", 
      utm, 
      pixels,
    };
  }
}

describe("Create Link", function () {
  const input = {
    destinationLink: "https://google.com",
    title: "title",
    shortlink: "shortlink",
    type: "link",
    image: "image",
    clicks: 0,
    utm: {
      source: "any_source",
      medium: "any_medium",
      campaignName: "any_campaign",
      term: "any_term",
      content: "any_content",
    },
    pixels: ["pixel1", "pixel2"],
    brand: "any_brand",
    groupId: "any_id",
    linkName: "any_name",
  };

  test("should create a link with correct params", async function () {
    const sut = new CreateLinkService();
    const output = await sut.execute(input);
    expect(output.id).toBeDefined();
    expect(output.utm).toBe("{\"source\":\"any_source\",\"medium\":\"any_medium\",\"campaignName\":\"any_campaign\",\"term\":\"any_term\",\"content\":\"any_content\"}");
    expect(output.pixels).toBe("[\"pixel1\",\"pixel2\"]");
    expect(output.destinationLink).toBe("https://google.com");
    expect(output.title).toBe("title");
    expect(output.shortlink).toBe("shortlink");
    expect(output.type).toBe("link");
    expect(output.image).toBe("image");
    expect(output.clicks).toBe(0);
    expect(output.brand).toBe("any_brand");
    expect(output.groupId).toBe("any_id");
    expect(output.linkName).toBe("any_name");
  });
});