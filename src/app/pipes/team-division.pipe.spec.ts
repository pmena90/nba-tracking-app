import { TeamDivisionPipe } from './team-division.pipe';

describe('TeamDivisionPipe', () => {
  it('create an instance', () => {
    const pipe = new TeamDivisionPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform division name by adding Division to the input value', () => {
    const pipe = new TeamDivisionPipe();
    const input = "Atlantic";
    const expected = `${input} Division`;

    const transformed = pipe.transform(input);

    expect(transformed).toBe(expected);
  })
});
