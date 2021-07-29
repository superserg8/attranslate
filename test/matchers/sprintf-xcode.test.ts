import { matchSprintfXcode } from "../../src/matchers/sprintf-xcode";
import { replaceInterpolations } from "../../src/matchers/matcher-definitions";

describe("Sprintf Xcode replacer", () => {
  it("should not error when no placeholders are present", () => {
    const { clean, replacements } = replaceInterpolations(
      "this is a test sentence",
      matchSprintfXcode
    );
    expect(clean).toEqual("this is a test sentence");
    expect(replacements).toEqual([]);
  });

  it("should replace sprintf syntax with placeholders", () => {
    const { clean, replacements } = replaceInterpolations(
      "this is a %ld\nsentence with %s placeholders",
      matchSprintfXcode
    );
    expect(clean).toEqual(
      "this is a <span>0</span><span>1</span>sentence with <span>2</span> placeholders"
    );
    expect(replacements).toEqual([
      { from: "%ld", to: "<span>0</span>" },
      { from: "\n", to: "<span>1</span>" },
      { from: "%s", to: "<span>2</span>" },
    ]);
  });
});
