export class Term {
  term_id: number;
  term_name: string;

  constructor(id?: number, name?: string) {
    this.term_id = <number>id;
    this.term_name = <string>name;
  }
}
