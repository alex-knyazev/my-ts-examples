type Man = {
  name: string
}

type WithCats = {
  cats: Array<string>
}

type WithDogs = {
  dogs: Array<string>
}

type WithParrots = {
  parrots: Array<string>
}

type ManRelationsT = {
  isWithCats: boolean
  isWithDogs: boolean
  isWithParrots: boolean
}

class ManGetter<ReturnType extends Man> {
  constructor(
    private relations: ManRelationsT = {
      isWithCats: false,
      isWithDogs: false,
      isWithParrots: false,
    },
  ) {}

  withCats(): ManGetter<ReturnType & WithCats> {
    this.relations.isWithCats = true

    return new ManGetter<ReturnType & WithCats>(this.relations)
  }

  withDogs(): ManGetter<ReturnType & WithDogs> {
    this.relations.isWithDogs = true

    return new ManGetter<ReturnType & WithDogs>(this.relations)
  }

  withParrots(): ManGetter<ReturnType & WithParrots> {
    this.relations.isWithParrots = true

    return new ManGetter<ReturnType & WithParrots>(this.relations)
  }

  exec(): ReturnType {
    let result: Man & Partial<WithParrots & WithDogs & WithCats> = {
      name: 'Яков',
    }

    if (this.relations.isWithDogs) {
      result = {
        ...result,
        dogs: ['Жужа'],
      }
    }
    if (this.relations.isWithCats) {
      result = {
        ...result,
        cats: ['Мурка'],
      }
    }
    if (this.relations.isWithParrots) {
      result = {
        ...result,
        parrots: ['Кеша'],
      }
    }

    return result as ReturnType
  }
}

const manGetter = new ManGetter()

const man = manGetter
  .withCats()
  .withParrots()
  .withDogs()
  .exec()
