import { mount } from "enzyme";
import { createRef, forwardRef, Ref, ForwardRefExoticComponent } from "react";
import { createStyledCommon, StyledCommonProps } from '.';

describe('hocs/createStyledCommon', () => {
    const DummyComponent = forwardRef<HTMLInputElement, { name?: string, className?: string }>((props, ref) => {
        return <input ref={ref} data-test-id="dummy-component" {...props} />;
    });
    const DummyComponentWithStyledCommon = createStyledCommon(DummyComponent);

    const setUp = (props: StyledCommonProps & { name?: string }, ref?: Ref<HTMLInputElement>) => mount(<DummyComponentWithStyledCommon ref={ref} {...props} />);

    it('Pass throught props to component was wrapped', () => {
        const component = setUp({ name: 'inputName' });
        expect(component.find('[data-test-id="dummy-component"]').getDOMNode()).toHaveAttribute('name', 'inputName');
    });

    it('Non pass styled common props to component was wrapped', () => {
        const styledComponentProps: Required<StyledCommonProps> = {
            height: 100,
            width: 50
        }
        const component = setUp({ ...styledComponentProps });
        expect(component.find('[data-test-id="dummy-component"]').props()).not.toMatchObject({
            ...styledComponentProps
        });
    });

    it('Can forward the component ref', () => {
        const ref = createRef<HTMLInputElement>();
        const component = setUp({  }, ref);
        expect(ref.current).toEqual(component.find('[data-test-id="dummy-component"]').getDOMNode());
    });

    it('Can set width style with type number', () => {
        const component = setUp({ width: 100 });
        expect(component.find('[data-test-id="dummy-component"]').getDOMNode()).toHaveStyleRule('width', "100");
    });
});