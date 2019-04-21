import {countPercentage} from '../../src/js/shared/functions'

describe('functions.js', function() {

  it('should count percentage', function() {
    expect(countPercentage(5,10)).toBe(50)
  })

  it('handle division by 0', function () {
    expect(function() { countPercentage(5,0) }).toThrowError(Error)
  })

  it('total value should be greater than device value', function () {
    expect(function () { countPercentage(5, 3) }).toThrowError(Error)
  })

});

