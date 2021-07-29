import { TMatcher } from "./matcher-definitions";

export const matchSprintfXcode: TMatcher = (
  input: string,
  replacer: (i: number) => string
) => {
  const matches = input.match(/(%ld)|(%lx)|(%lu)|(%zx)|(%.)|([\n])/g);

  return (matches || []).map((match, index) => ({
    from: match,
    to: replacer(index),
  }));
};
