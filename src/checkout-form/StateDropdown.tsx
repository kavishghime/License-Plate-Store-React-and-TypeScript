import React, { useEffect, useState, ChangeEvent } from 'react';

export interface UsState {
    name: string;
    abbreviation: string;
}

export interface StateDropdownProps {
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export function StateDropdown(props: StateDropdownProps) {

    const [usStates, setUsStates] = useState<UsState[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/states")
            .then(response => response.json())
            .then(data => setUsStates(data))
    }, []);

    return <select
        name={props.name}
        className="form-control"
        value={props.value}
        onChange={props.onChange}
    >
        {usStates.map(usState =>
            <option
                key={usState.abbreviation}
                value={usState.abbreviation}
            >
                {usState.name}
            </option>
        )}
    </select>;

}
