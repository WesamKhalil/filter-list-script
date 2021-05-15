// Identifier parameters are the class, id or element that identifies the element for it's corresponding role.
// highlight class is the name of the class that's added to the button that's currently active and filtering the list.
// conditionAttribute is the name of the attribute on the button which has a value you want to use to filter through the list.
// categoryAttribute is similar but is on the list elements and is compared to the condtions to filter the list, it can have multipple values.

const filterList = ({
    identifier = {
        filterGroup: '.condition-group',
        displayElements: '.events-list-container',
        filterButton: 'button'
    },
    highlightClass = 'button-highlight',
    conditionAttribute = 'filter-condition',
    categoryAttribute = 'filter-category'}) =>
{
    const { filterGroup, displayElements, filterButton } = identifier
    const groups = document.querySelectorAll(filterGroup)
    const elementList = Array.from(document.querySelector(displayElements).children)
    const conditions = new Array(groups.length).fill('all')
    let itemHeight = elementList[0].clientHeight

    for (let i = 0; i < groups.length; i++) {
        const buttons = Array.from(groups[i].querySelectorAll(filterButton))

        buttons.map(b => {
            const condition = b.getAttribute(conditionAttribute)


            b.addEventListener('click', e => updateCondition(e, condition, i))

            if (b.getAttribute(conditionAttribute) === 'all') b.classList.add(highlightClass)
        })
    }

    elementList.map(e => {
        e.style.overflow = 'hidden'
        e.style.transition = 'height .4s ease-in-out'
        e.style.height = itemHeight + 'px'
    })

    const updateCondition = (event, newCondition, index) => {
        const buttons = Array.from(groups[index].querySelectorAll(filterButton))

        buttons.map(b => b.classList.remove(highlightClass))

        if (conditions[index] === newCondition) {
            buttons.map(b => b.getAttribute(conditionAttribute) === 'all' ? b.classList.add(highlightClass) : null)

            conditions[index] = 'all'
        } else {
            conditions[index] = newCondition

            event.target.classList.add(highlightClass)
        }

        filter()
    }

    const filter = () => {
        elementList.map(e => {
            if (e.clientHeight != 0) {
                itemHeight = e.clientHeight
                e.style.height = itemHeight + 'px'
            }

            const classList = e.getAttribute(categoryAttribute).split(" ")

            const shouldRender = conditions.every(condition => {
                if (condition === 'all') return true

                return classList.indexOf(condition) > -1
            })

            if (shouldRender) e.style.height = itemHeight + 'px'

            else e.style.height = 0 + 'px'
        })
    }
}