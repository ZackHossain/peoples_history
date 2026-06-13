from peoples_history.models.event import Event


def test_event_to_dict():

    event = Event(
        uuid="123",
        name="October Revolution",
        start_date="1917-11-07",
        end_date="1917-11-08",
        summary="Bolsheviks seize power",
        locations=["petrograd"],
        resources=[],
        tags=["revolution"],
        relationships=[]
    )

    result = event.to_dict()

    assert result["uuid"] == "123"
    assert result["name"] == "October Revolution"
    assert result["start_date"] == "1917-11-07"
    assert result["tags"] == ["revolution"]