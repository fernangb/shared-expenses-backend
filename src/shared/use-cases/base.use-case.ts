export interface IBaseUseCase<Input, Output> {
  handle(props: Input): Promise<Output>;
}
