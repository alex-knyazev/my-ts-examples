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

class ManGetter<ReturnType extends Man> {
  isWithCats: boolean
  isWithDogs: boolean
  isWithParrots: boolean

  constructor() {
    this.isWithCats = false
    this.isWithDogs = false
    this.isWithParrots = false
  }

  withCats(): ManGetter<ReturnType & WithCats> {
    this.isWithCats = true

    return new ManGetter<ReturnType & WithCats>()
  }

  withDogs(): ManGetter<ReturnType & WithDogs> {
    this.isWithDogs = true

    return new ManGetter<ReturnType & WithDogs>()
  }

  withParrots(): ManGetter<ReturnType & WithParrots> {
    this.isWithParrots = true

    return new ManGetter<ReturnType & WithParrots>()
  }

  exec(): ReturnType {
    let result: Man & Partial<WithParrots & WithDogs & WithCats> = {
      name: 'Яков',
    }

    if (this.isWithDogs) {
      result = {
        ...result,
        dogs: ['Жужа'],
      }
    }
    if (this.isWithCats) {
      result = {
        ...result,
        cats: ['Мурка'],
      }
    }
    if (this.isWithParrots) {
      result = {
        ...result,
        parrots: ['Кеша'],
      }
    }

    return result as ReturnType
  }
}

const manGetter = new ManGetter()

// type of man is changed depend on called 'with' methods
const man = manGetter
  .withCats()
  .withParrots()
  .withDogs()
  .exec()
